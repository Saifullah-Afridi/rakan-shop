import { httpError } from "../../lib/httpError.js";
import { prisma } from "../../lib/prisma.js";
import { deleteImage, uploadImage } from "../../lib/storage.js";

// The shape the React app expects. Prisma returns price as a Decimal, so it is turned into a number.
const toDto = (p) => ({
  id: p.id,
  categoryId: p.categoryId,
  name: p.name,
  description: p.description,
  farm: p.farm,
  price: Number(p.price),
  unit: p.unit,
  minQuantity: p.minQuantity,
  image: p.image ?? "",
});

const ORDER = { newest: { id: "desc" }, "price-asc": { price: "asc" }, "price-desc": { price: "desc" } };

async function findOrFail(id) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) throw httpError(404, "Product not found.");
  return product;
}

async function assertCategoryExists(categoryId) {
  if (!(await prisma.category.findUnique({ where: { id: categoryId } }))) {
    throw httpError(400, "categoryId: that category does not exist.");
  }
}

export async function listProducts({ category, q, sort }) {
  const rows = await prisma.product.findMany({
    where: {
      ...(category && { categoryId: category }),
      ...(q && { OR: [{ name: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] }),
    },
    orderBy: ORDER[sort] ?? { id: "asc" },
  });
  return rows.map(toDto);
}

export async function getProduct(id) {
  return toDto(await findOrFail(id));
}

export async function createProduct(data, file) {
  await assertCategoryExists(data.categoryId);
  const image = file ? await uploadImage(file, "products") : null;
  try {
    return toDto(await prisma.product.create({ data: { ...data, image } }));
  } catch (error) {
    await deleteImage(image);
    throw error;
  }
}

export async function updateProduct(id, data, file) {
  const current = await findOrFail(id);
  if (data.categoryId) await assertCategoryExists(data.categoryId);
  const image = file ? await uploadImage(file, "products") : undefined;
  try {
    const row = await prisma.product.update({ where: { id }, data: { ...data, ...(image && { image }) } });
    if (image) await deleteImage(current.image);
    return toDto(row);
  } catch (error) {
    await deleteImage(image);
    throw error;
  }
}

export async function deleteProduct(id) {
  const current = await findOrFail(id);
  await prisma.product.delete({ where: { id } });
  await deleteImage(current.image);
}

import { httpError } from "../../lib/httpError.js";
import { prisma } from "../../lib/prisma.js";
import { slugify } from "../../lib/slug.js";
import { deleteImage, uploadImage } from "../../lib/storage.js";

// The shape the React app expects.
const toDto = (c) => ({
  id: c.id,
  name: c.name,
  description: c.description,
  icon: c.icon,
  color: c.color,
  tint: c.tint,
  image: c.image ?? "",
});

async function findOrFail(id) {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) throw httpError(404, "Category not found.");
  return category;
}

export async function listCategories() {
  const rows = await prisma.category.findMany({ orderBy: { createdAt: "asc" } });
  return rows.map(toDto);
}

export async function getCategory(id) {
  return toDto(await findOrFail(id));
}

export async function createCategory(data, file) {
  const id = slugify(data.name) || `category-${Date.now()}`;
  if (await prisma.category.findUnique({ where: { id } })) {
    throw httpError(409, "A category with this name already exists.");
  }
  const image = file ? await uploadImage(file, "categories") : null;
  try {
    return toDto(await prisma.category.create({ data: { id, ...data, image } }));
  } catch (error) {
    await deleteImage(image); // do not leave an unused file behind
    throw error;
  }
}

export async function updateCategory(id, data, file) {
  const current = await findOrFail(id);
  const image = file ? await uploadImage(file, "categories") : undefined;
  try {
    const row = await prisma.category.update({ where: { id }, data: { ...data, ...(image && { image }) } });
    if (image) await deleteImage(current.image); // the old photo is replaced
    return toDto(row);
  } catch (error) {
    await deleteImage(image);
    throw error;
  }
}

export async function deleteCategory(id) {
  const current = await findOrFail(id);
  const used = await prisma.product.count({ where: { categoryId: id } });
  if (used > 0) throw httpError(409, `This category still has ${used} products. Move or delete them first.`);
  await prisma.category.delete({ where: { id } });
  await deleteImage(current.image);
}

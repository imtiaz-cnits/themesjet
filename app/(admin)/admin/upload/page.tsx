import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

interface PageProps {
    searchParams?: Promise<{
        edit?: string;
    }>;
}

export default async function UploadPage(props: PageProps) {
    const searchParams = await props.searchParams;
    const editId = searchParams?.edit;

    let product = null;

    if (editId) {
        const rawProduct = await prisma.product.findUnique({
            where: { id: editId }
        });

        // Convert Decimal to number for the form
        if (rawProduct) {
            product = {
                ...rawProduct,
                price: Number(rawProduct.price),
                tags: rawProduct.tags as string[] // Assert tags type
            };
        }
    }

    return (
        <ProductForm initialData={product} />
    );
}
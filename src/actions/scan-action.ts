"use server";

export async function scanFileAction(formData: FormData) {
    console.log("HERRE");

    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/scan`, {
        method: "POST",
        body: formData,
    });

    console.log(res);

    if (!res.ok) {
        throw new Error("Scan failed");
    }

    return res.json();
}

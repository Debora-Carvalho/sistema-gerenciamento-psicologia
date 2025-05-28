import BASE_URL from '../configRota';

const useUploadFotoPerfil = () => {
    const uploadFotoPerfil = async (file, userId) => {
        const formData = new FormData();
        formData.append("imagem", file);       
        formData.append("userId", userId);

        try {
            const response = await fetch(`${BASE_URL}/upload-foto-perfil`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Erro ao enviar foto.");
            }

            window.location.reload();
            return data.fileId;
        } catch (error) {
            console.error("Erro no upload:", error);
            throw error;
        }
    };

    return { uploadFotoPerfil };
};

export default useUploadFotoPerfil;

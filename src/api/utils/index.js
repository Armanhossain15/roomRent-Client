import axios from "axios";


export const imageUpload = async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=ee2051c19a4daaaa574dda387a8f7567`,
        formData
    )
    return(data.data.display_url);
};


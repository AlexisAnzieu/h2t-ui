<template>
    <div class="ad-pic-uploader" @click="openCloudinaryWidget()">
        <img
            v-if="picture"
            :src="picture.replace('.heic', '.jpg')"
            class="ad-pic"
        />
        <i v-else class="el-icon-plus ad-pic-uploader-icon"></i>
    </div>
</template>

<script>
import gql from "graphql-tag";

export default {
    props: ["type", "picture", "public_id"],
    data() {
        return {};
    },
    methods: {
        openCloudinaryWidget() {
            const opts = {
                cloudName: "dkbuiehgq",
                apiKey: process.env.CLOUDINARY_API_KEY,
                uploadSignature: this.generateSignature,
                maxImageFileSize: 5000000, // 5mb
                public_id: this.public_id,
                multiple: false,
                maxFiles: 1,
                language: "fr",
                clientAllowedFormats: ["png", "jpg", "jpeg", "heic", "heif"],
            };
            cloudinary
                .createUploadWidget(opts, (error, result) => {
                    //checking if upload was successfully done!
                    if (!error && result && result.event === "success") {
                        this.$emit(
                            "pictureUpdate",
                            result.info.secure_url.replace(".heic", ".jpg")
                        );
                    }
                })
                .open();
        },
        async generateSignature(callback, params_to_sign) {
            return await this.$apollo
                .query({
                    query: gql`
                        query generateSignature(
                            $timestamp: Int!
                            $source: String!
                            $folder: String
                            $public_id: String
                        ) {
                            generateSignature(
                                timestamp: $timestamp
                                source: $source
                                folder: $folder
                                public_id: $public_id
                            ) {
                                code
                                message
                            }
                        }
                    `,
                    variables: params_to_sign,
                })
                .then((result) => {
                    return callback(result.data.generateSignature.message);
                });
        },
    },
};
</script>

<style>
.ad-pic-uploader {
    width: 178px;
    height: 178px;
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
}
.ad-pic-uploader:hover {
    border-color: #409eff;
}
.ad-pic-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.ad-pic {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<template>
    <el-upload
        v-loading="loading"
        class="avatar-uploader"
        :auto-upload="false"
        action=""
        accept=".jpeg,.jpg,.png,image/jpeg,image/png"
        :on-change="uploadAvatar"
        :show-file-list="false"
    >
        <img
            :src="
                this.$auth.user.picture
                    ? this.$auth.user.picture
                    : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
            "
            class="avatar"
        />
    </el-upload>
</template>

<script>
import gql from "graphql-tag";

export default {
    data() {
        return {
            loading: false,
        };
    },
    methods: {
        uploadAvatar(file) {
            this.loading = true;
            const isJPG = ["image/jpeg", "image/png"].includes(file.raw.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("Avatar picture must be JPG format!");
                this.loading = false;
            }
            if (!isLt2M) {
                this.$message.error("Avatar picture size can not exceed 2MB!");
                this.loading = false;
            }

            if (isJPG && isLt2M) {
                this.sendFile(file.raw);
            }
        },
        async sendFile(file) {
            /* Make sure file exists */
            if (!file) return;

            /* create a reader */
            const readData = (f) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(f);
                });

            /* Read data */
            const data = await readData(file);

            this.$apollo
                .mutate({
                    mutation: gql`
                        mutation addUserProfilePicture(
                            $file: Upload!
                            $userId: Int!
                            $type: String
                        ) {
                            uploadPhoto(
                                file: $file
                                userId: $userId
                                type: $type
                            ) {
                                message
                                code
                            }
                        }
                    `,
                    variables: {
                        file: data,
                        userId: this.$auth.user.id,
                        type: "profile_picture",
                    },
                })
                .then((resp) => {
                    if (resp.data.uploadPhoto.code === 200) {
                        if (!this.$auth.user.picture) {
                            this.$emit("addLevel", 1);
                        }

                        this.$auth.setUser({
                            ...this.$auth.user,
                            picture: resp.data.uploadPhoto.message,
                        });
                    } else {
                        this.$message.error({
                            message: resp.data.uploadPhoto.message,
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border: 4px dashed #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

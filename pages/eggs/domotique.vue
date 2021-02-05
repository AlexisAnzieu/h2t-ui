<template>
    <el-row style="text-align: center; padding-top: 20px" :gutter="24">
        <el-col :span="24" style="margin-bottom: 20px">
            <el-button @click="openDoor()" type="primary" round
                >Baisser le pont levis</el-button
            >
        </el-col>
        <el-col :span="24">
            <iframe
                src="https://giphy.com/embed/MUAw2ydNacjOU"
                width="480"
                height="269"
                frameborder="0"
                class="giphy-embed"
                allowfullscreen
            ></iframe>
        </el-col>
    </el-row>
</template>

<script>
import axios from "axios";
export default {
    head() {
        return {
            title: "H2T.domo",
        };
    },
    data() {
        return {
            lockDoor: false,
        };
    },
    methods: {
        async openDoor() {
            if (this.lockDoor) return;
            this.lockDoor = true;
            this.$message.success("Pont levis baissé !");
            this.$axios({
                url: process.env.h2tCoreUrl,
                method: "post",
                data: {
                    query: `
                mutation{
                openDoor(facebookUserId:"${this.$auth.user.id}"){message}
                }
            `,
                },
                headers: {
                    Authorization: "",
                },
            })
                .then((result) => {
                    this.$message.success("Pont levis remonté !");
                    this.lockDoor = false;
                })
                .catch(function (error) {
                    this.$message.error("Erreur lors de la manoeuvre !");
                });
        },
    },
};
</script>
<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>

<template>
    <div class="body">
        <el-button
            style="
            margin-top:20px
                width: 300px;
                height: 300px;
                border-radius: 50%;
                font-size: 60px;
            "
            type="danger"
            :disabled="disabledDoor"
            @click="openDoor()"
            >PORTE</el-button
        >
    </div>
</template>

<script>
export default {
    auth: false,
    computed: {
        disabledDoor() {
            const hours = new Date().getHours();
            return hours < 19;
        },
    },
    methods: {
        async openDoor() {
            const result = await fetch("/api/openDoor");
            const data = await result.json();
            if (data.msg === "ok") {
                this.$message.success({
                    message: "Porte ouverte",
                });
            } else {
                this.$message.error(data);
            }
        },
    },
};
</script>

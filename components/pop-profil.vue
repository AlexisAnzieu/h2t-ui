<template>
    <el-popover placement="top" width="175" trigger="hover">
        <div>
            <h3 style="text-align: center">{{ user.firstName }}</h3>
            <el-image
                style="
                    width: 150px !important;
                    height: 150px !important;
                    border-radius: 50%;
                "
                :src="user.picture"
            ></el-image>
        </div>
        <el-button
            @click="$router.push({ name: 'user-id', params: { id: user.id } })"
            round
            slot="reference"
            >{{ user.firstName }}</el-button
        >
    </el-popover>
</template>

<script>
import dayjs from "dayjs";
import "dayjs/locale/fr";

export default {
    props: ["user"],
    filters: {
        firstSubscriptionDate: function (date) {
            return dayjs().diff(dayjs(date), "day");
        },
    },
};
</script>

<style scoped>
.el-popover.el-popper {
    border-radius: 50%;
    text-align: center;
}
</style>

<template>
    <el-popover placement="top-start" width="200" trigger="hover">
        <div style="text-align: center">
            <h3>{{ user.firstName }}</h3>
            Inscrit il y a {{ user.createdAt | firstSubscriptionDate }} jours
            <el-image
                style="width: 150px !important; height: 150px !important"
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

<template>
    <el-row>
        <el-col :span="24" v-for="user in users" :key="user.first_name">
            <el-card :body-style="{ padding: '0px' }">
                <el-row type="flex" align="middle" style="text-align: center">
                    <el-col :span="12">
                        <h2>{{ user.first_name }}</h2>
                    </el-col>
                    <el-col :span="12">
                        <el-image :src="user.picture" fit="cover"></el-image>
                    </el-col>
                </el-row>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    head() {
        return {
            title: "H2T.convives",
        };
    },
    async asyncData({ $axios, store }) {
        let result = await $axios.post(
            process.env.h2tCoreUrl,
            {
                query:
                    '{users(where: { updatedAt_gte: "2019-12-20" },orderBy: first_name_ASC){first_name,picture}}',
            },
            {
                headers: { Authorization: "" },
            }
        );
        return {
            users: result.data.data.users,
        };
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

<template>
    <el-row style="text-align: center; padding-top: 20px" :gutter="24">
        <el-col :span="24">
            <el-calendar>
                <!-- Use 2.5 slot syntax. If you use Vue 2.6, please use new slot syntax-->
                <template slot="dateCell" slot-scope="{ data }">
                    <p>
                        {{ data.day.split("-")[2] }}
                        <br />
                        <nuxt-link :to="fillCalendar(data.day).url">
                            {{ fillCalendar(data.day).title }}
                        </nuxt-link>
                    </p>
                </template>
            </el-calendar>
        </el-col>
    </el-row>
</template>

<script>
export default {
    head() {
        return {
            title: "H2T.calendar",
        };
    },
    auth: true,
    data() {
        return {
            value: new Date(),
        };
    },
    methods: {
        // a computed getter
        fillCalendar: function (day) {
            const dates = {
                "2020-07-11": {
                    title: "BR Projets",
                    url: "/eggs/boilerroom",
                },
                "2020-07-01": {
                    title: "H2TMO",
                    url: "/",
                    external: true,
                },
                "2020-03-04": {
                    title: "BR House 2 Techno",
                    url: "/eggs/boilerroom",
                },
                "2020-02-19": {
                    title: "BR House Jazz Fusion",
                    url: "/eggs/boilerroom",
                },
                "2020-01-29": {
                    title: "BR Funk Tribal",
                    url: "/eggs/boilerroom",
                },
                "2020-01-08": {
                    title: "BR Italo Disco",
                    url: "/eggs/boilerroom",
                },
                "2019-12-21": {
                    title: "H2T FETE NOWEL",
                    url: "",
                },
                "2019-12-18": {
                    title: "BR Christmas",
                    url: "/eggs/boilerroom",
                },
                "2019-11-30": {
                    title: "COSMOS #3",
                    url: "/eggs/calendar/cosmos/3",
                },
                "2019-11-06": {
                    title: "BR Rap live",
                    url: "/eggs/boilerroom",
                },
            };

            return dates[day] || { title: "", url: "" };
        },
    },
};
</script>

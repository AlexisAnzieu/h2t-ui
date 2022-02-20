<template>
    <el-col>
        <h3>Activités de piscinade</h3>
        <br />
        <el-alert
            title="Ne fonctionne que sur la semaine à venir"
            type="warning"
            :closable="false"
            show-icon
        >
        </el-alert>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="Nom"> </el-table-column>
            <el-table-column
                prop="location"
                label="Lieu"
                :filters="getUniqLocation()"
                :filter-method="filterLocation"
                filter-placement="bottom-end"
            >
            </el-table-column>
            <el-table-column label="Operations">
                <template slot-scope="scope">
                    <el-button
                        v-if="!scope.row.isUserSubscribed"
                        @click="handleClick(scope, 'subscribe')"
                        size="small"
                        >S'inscrire</el-button
                    >
                    <el-button
                        v-if="scope.row.isUserSubscribed"
                        @click="handleClick(scope, 'unsubscribe')"
                        size="small"
                        type="danger"
                        >Se désinscrire</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-col>
</template>

<script>
import _ from "lodash";

export default {
    data() {
        return {
            tableData: [],
        };
    },
    async fetch() {
        const activities = await fetch(
            `${process.env.PUBSUB_ENDPOINT}/activities?user=${this.$auth.user.id}`
        ).then((res) => res.json());
        this.tableData = activities.map((activity) => {
            return {
                name: activity.description,
                location: activity.mainSite.name,
                activityId: activity.id,
                day: activity.activitySchedules[0].dayOfWeek.id,
                hour: activity.activitySchedules[0].startTime,
                isUserSubscribed: activity.isUserSubscribed,
            };
        });
    },
    methods: {
        getUniqLocation() {
            const arr = this.tableData.map((activity) => ({
                text: activity.location,
                value: activity.location,
            }));
            return _.uniqWith(arr, _.isEqual);
        },
        filterLocation(value, row) {
            return row.location === value;
        },
        async handleClick(scope, method) {
            await fetch(`${process.env.PUBSUB_ENDPOINT}/activities/user`, {
                method: method === "subscribe" ? "POST" : "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...scope.row,
                    userId: this.$auth.user.id,
                    userName: this.$auth.user.firstName,
                }),
            });
            this.$nuxt.refresh();
        },
    },
};
</script>

<style scoped></style>

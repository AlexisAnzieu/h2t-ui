<template>
    <el-row style="text-align: center; padding-top: 20px" :gutter="24">
        <el-col :span="24">
            <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=America%2FToronto&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&src=YzNhZ2hyNWxua2JubWtsM2ltaXEyM2pmdnNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%238E24AA"
                style="border-width: 0"
                width="80%"
                height="400px"
                frameborder="0"
                scrolling="no"
            ></iframe>
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
    auth: false,
};
</script>

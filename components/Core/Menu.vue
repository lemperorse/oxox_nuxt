<template>
<div class="m-4 rounded-xl shadow-2xl border-b-4 border-green-500 p-4">
    <div class="flex  ">
        <img class="w-16" :src="icon" alt="">
        <div class="pl-4">
            <h4 class="text-xl">{{name}}</h4>
            <h3>{{text}}</h3>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        name: { default: 'รายงาน' },
        icon: { default: '/business-report.png' },
        text: { default: 'ข้อมูลสรุปรายระเอียดต่างๆ' }, 

    },
    data: () => {
        return ({
            test: 'sss'
        })
    }
}
</script>

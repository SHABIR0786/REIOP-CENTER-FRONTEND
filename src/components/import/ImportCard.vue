<template>
    <b-card class="mb-5">
        <b-card-text>
            <input type="file" 
                accept=".xls, .xlsx, .csv" 
                class="custom_file_input"
            >asd
            <button type="button" class="custom_file_btn">
                Choose a xlsx or csv file
            </button>
            <h4>{{item.text}}</h4>
            <input type="submit" class="btn btn-info custom-submit">
        </b-card-text>
    </b-card>
</template>

<script>

export default {
    name: "ImportCard",
    props: {
        item: {
            type: Object
        }
    },
}
</script>
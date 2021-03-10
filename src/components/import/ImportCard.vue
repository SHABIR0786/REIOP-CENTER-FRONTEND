<template>
    <b-card class="mb-5">
        <b-card-text class="text-center">
            
            <a class="file-input-group">
                <input type="file" 
                    accept=".xls, .xlsx, .csv" 
                    class="file-input"
                    :id="item.id"
                >
                <label :for="item.id">Choose a xlsx or csv file</label>
            </a>
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
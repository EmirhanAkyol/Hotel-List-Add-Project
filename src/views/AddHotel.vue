<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <span @click="showBox" type="button" data-toggle="modal" data-target="#exampleModal">
          <span class="btn btn-outline-primary fw-bold fs-4 px-3 mx-3">+</span>
          <span class="fs-3 text-black fw-bold">OTEL EKLE</span>
          <br><br>
        </span>
        <div v-if="isBoxVisible" class="box">
          <input v-model="otelAdi" class="form-control" type="text" placeholder="Otel Adı Girin">
          <br>
          <button @click="ekleOtel" :class="{'btn btn-success': otelEklendi, 'btn btn-primary': !otelEklendi}">
          <span v-if="!otelEklendi">EKLE</span>
          <span v-else>EKLENDİ </span>
        </button>
        </div> 
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isBoxVisible: false,
      otelAdi: '',
      otelListesi: [],
      otelEklendi: false
    };
  },
  methods: {
    showBox() {
      this.isBoxVisible = true;
    },
    ekleOtel() {
      if (this.otelAdi.trim() !== '') {
        const newOtel = {
          id: new Date().getTime(),
          adi: this.otelAdi,
          puan: 0,
          sonOyTarihi: new Date()
        };
        

        let otelListesi = localStorage.getItem('otelListesi');
        if (otelListesi && JSON.parse(otelListesi)) {
          console.log("otelListesi: ", JSON.parse(otelListesi), newOtel);

          var arrayList = JSON.parse(otelListesi)
          arrayList.push(newOtel);
          
          localStorage.setItem('otelListesi', JSON.stringify(arrayList));
        } else {
          localStorage.setItem('otelListesi', JSON.stringify([newOtel]));
        }

        this.otelEklendi = true;

        setTimeout(() => {
      this.otelEklendi = false;
      }, 2000);
      }
    }
  }
};
</script>
<style>
.point {
  font-size: large;
  color: rgb(40 180 190);
  background-color: rgb(232 238 238);
  border-color: rgb(232 238 238);
  border-radius: 2rem;
}
.box {
  margin-top: 10px;
}
.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
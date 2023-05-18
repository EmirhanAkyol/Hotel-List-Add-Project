<template>
  <router-link to="/addHotel" style="text-decoration: none">
    <span class="fs-3 text-black fw-bold">Otel Ekle</span>
    <br><br>
  </router-link>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div>
          <label for="siralama"> Sıralama:</label>
          <select id="siralama" v-model="siralama" @change="sortOtelListesi">
            <option value="azalan">Puan (Azalan)</option>
            <option value="artan">Puan (Artan)</option>
          </select>
        </div>
        <br>
        <div class="card card-sm shadow-lg p-3 mb-5 bg-white rounded border border-white mx-1"
          v-for="(otel) in displayedOtelListesi" :key="otel.id" @mouseenter="setHoveredOtel(otel.id)"
          @mouseleave="clearHoveredOtel">
          <div class="row no-gutters ">
            <div class="col-md-4 p-2">
              <img src="/images/hotel.png" alt="Hotel">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title">{{ otel.adi }}</h2>
                <div class="col-md-12 point">
                  {{ otel.puan }} Puan
                </div>
                <button v-if="hoveredOtel === otel.id" class="btn btn-outline-danger btn-sm delete-button" type="button"
                  data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openModal(otel)">Sil
                </button>
              </div>
              <div class="d-flex justify-content-around border-0 mt-3">
                <button class="btn btn-outline-primary" @click="artirPuan(otel)">PUAN ARTIR</button>
                <button class="btn btn-outline-primary" @click="azaltPuan(otel)">PUAN AZALT</button>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination-container d-flex justify-content-center">
          <nav v-if="pages.length > 1" aria-label="Otel Sayfaları">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" aria-label="Previous" @click="changePage(currentPage - 1)">
                  <span aria-hidden="true">&laquo;</span></a>
              </li>
              <li v-for="page in pages" :key="page" :class="{ 'page-item': true, active: page === currentPage }">
                <button class="page-link" @click="changePage(page)">{{ page }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" aria-label="Next" @click="changePage(currentPage + 1)">
                  <span aria-hidden="true">&raquo;</span></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
    v-if="showModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Oteli Sil</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <strong>{{ otelToDelete ? otelToDelete.adi : '' }}</strong>'i silmek istediğinizden emin misiniz?
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-primary" @click=deleteOtelConfirm()>Oteli Sil</button>
          <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">Vazgeç</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';
export default {
  data() {
    return {
      otelAdi: '',
      otelListesi: [],
      siralama: '', // varsayılan olarak herhangi bir sıralama seçeneği yok
      currentPage: 1,
      itemsPerPage: 5, // her sayfada gösterilecek otel sayısı
      hoveredOtel: null,
      otelToDelete: '',
      showModal: true,
      theModal: null
    };
  },
  methods: {
    showBox() {
      this.isBoxVisible = true;
    },
    addOtel() {
      if (this.otelAdi.trim() !== '') {
        const newOtel = {
          id: new Date().getTime(),
          adi: this.otelAdi,
          puan: 0,
          sonOyTarihi: new Date()
        };

        this.otelListesi.push(newOtel);
        this.otelAdi = '';

        localStorage.setItem('otelListesi', JSON.stringify(this.otelListesi));

        this.sortOtelListesi();
        this.otelEklendi = true;
      }
    },
    artirPuan(otel) {
      otel.puan += 1;
      otel.sonOyTarihi = new Date();

      this.sortOtelListesi();

      localStorage.setItem('otelListesi', JSON.stringify(this.otelListesi));
    },
    azaltPuan(otel) {
      if (otel.puan > 0) {
        otel.puan -= 1;
        otel.sonOyTarihi = new Date();

        this.sortOtelListesi();

        localStorage.setItem('otelListesi', JSON.stringify(this.otelListesi));
      }
    },
    sortOtelListesi() {
      if (this.siralama === 'artan') {
        this.otelListesi.sort((a, b) => {
          if (a.puan === b.puan) {
            return new Date(b.sonOyTarihi) - new Date(a.sonOyTarihi);
          }
          return a.puan - b.puan;
        });
      } else if (this.siralama === 'azalan') {
        this.otelListesi.sort((a, b) => {
          if (a.puan === b.puan) {
            return new Date(b.sonOyTarihi) - new Date(a.sonOyTarihi);
          }
          return b.puan - a.puan;
        });
      } else {
        this.otelListesi.sort((a, b) => {
          if (a.puan === b.puan) {
            return new Date(b.sonOyTarihi) - new Date(a.sonOyTarihi);
          }
          return b.puan - a.puan;
        });
      }
    },
    setSiralama(siralama) {
      this.siralama = siralama;
      this.sortOtelListesi();
    },
    changePage(page) {
      this.currentPage = page;
    },
    openModal(otel) {
      this.otelToDelete = otel;
      this.showModal = true;
    },
    deleteOtelConfirm() {
      const index = this.otelListesi.findIndex(item => item.id === this.otelToDelete.id);
      if (index !== -1) {
        this.otelListesi.splice(index, 1);
        localStorage.setItem('otelListesi', JSON.stringify(this.otelListesi));
      }
      this.deleteOtelCancel();
    },
    deleteOtelCancel() {
      location.reload();
      this.theModal.hide();
      this.showModal = false;
      this.otelToDelete = null;
    },
    setHoveredOtel(otelId) {
      this.hoveredOtel = otelId;
    },
    clearHoveredOtel() {
      this.hoveredOtel = null;
    }
  },
  computed: {
    totalItems() {
      return this.otelListesi.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    displayedOtelListesi() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.otelListesi.slice(startIndex, endIndex);
    },
    pages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  mounted() {

    this.theModal = new Modal(document.getElementById('exampleModal'));

    const otelListesi = localStorage.getItem('otelListesi');
    if (otelListesi) {
      this.otelListesi = JSON.parse(otelListesi);
      this.sortOtelListesi();
    }

    return
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

.card:hover {
  transform: scale(1.25);
  /* Kartı büyütme */
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.modal {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.modal-content {
  background-color: #fff;
  max-width: 400px;
  padding: 20px;
  border-radius: 4px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.buttons button {
  margin-left: 10px;
}
</style>
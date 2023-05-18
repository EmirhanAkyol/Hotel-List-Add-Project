# ets-project

Proje SPA olarak yapılmıştır. İki ayrı sayfa içermektedir;

Otel listeleme sayfası,
Otel ekleme sayfası

# Otel Uygulaması

Bu proje, otellerin eklenip yönetilebileceği bir uygulamadır. Otel ekleme, puan artırma/azaltma ve otelleri sıralama gibi işlemleri gerçekleştirebilirsiniz.

## Kurulum

1. Projenin kök dizininde aşağıdaki komutu çalıştırarak gerekli bağımlılıkları yükleyin:

npm install

2. Proje bağımlılıklarını başarıyla yükledikten sonra aşağıdaki komutu çalıştırarak uygulamayı başlatın:

 npm run serve

3. Tarayıcınızda `http://localhost:8080` adresine giderek uygulamayı görüntüleyebilirsiniz.

## Kullanım

### Otel Ekleme

Uygulamanın anasayfasında (Hotel List Page) "OTEL EKLE" butonuna tıklayarak Otel Ekleme Sayfasına(Add Hotel Page) yönlendirildikten sonra yeni bir otel ekleyebilirsiniz. Otel adını girin ve "EKLE" düğmesine tıklayın. Otel, otel listesine eklenir ve otel adıyla birlikte görüntülenir.

### Puan Artırma/Azaltma

Otel listesinde her otelin yanında "PUAN ARTIR" ve "PUAN AZALT" düğmeleri bulunur. Bir otelin puanını artırmak veya azaltmak için ilgili düğmeye tıklayın. Oteller, puanlarına göre otomatik olarak sıralanacaktır.

### Otelleri Sıralama

Otel listesinin üst kısmında "Sıralama" adlı bir açılır menü bulunur. Bu menüde "Azalan (Puan)" ve "Artan (Puan)" seçenekleri vardır. Otelleri puanlarına göre azalan veya artan şekilde sıralamak için ilgili seçeneği seçin.

### Otel Silme

Her otelin yanında "Sil" düğmesi bulunur. Bir oteli silmek için ilgili otelin "Sil" düğmesine tıklayın ve açılan onay penceresinde "Oteli Sil" düğmesine tıklayın. Oteller, otel listesinden kaldırılacaktır.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

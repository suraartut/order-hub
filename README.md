# OrderHub

OrderHub, kullanıcıların ve siparişlerin yönetimini kolaylaştırmak için geliştirilmiş bir web uygulamasıdır. Bu uygulama, kullanıcı giriş işlemlerini, kullanıcı ve sipariş listelerini ve kullanıcı bilgilerini düzenleme işlevselliğini sunmaktadır.

## Özellikler

- **Kullanıcı Girişi:** Kullanıcılar, güvenli bir giriş ekranı ile sisteme giriş yapabilir.
- **Kullanıcı ve Sipariş Listeleme:** İki ayrı tabloda kullanıcılar ve onların siparişleri listelenir. Seçili kullanıcıya ait siparişler otomatik olarak güncellenir.
- **Yeni Kayıt ve Düzenleme:** Kullanıcı bilgilerini düzenlemek veya yeni bir kullanıcı eklemek için ayrı bir sayfa mevcuttur.
- **Sipariş Yönetimi:** Kullanıcıya ait siparişler tablo halinde görüntülenir ve kullanıcı, siparişleri doğrudan bu tabloda düzenleyebilir veya silebilir.

## Teknolojiler

- **React.js:** Kullanıcı arayüzü için.
- **DevExpress:** DataGrid ve Form bileşenleri için.
- **Tailwind CSS:** Stil ve düzenleme için.
- **Axios:** API ile iletişim için.
- **React Router:** Sayfa yönlendirmesi için.

## Kurulum

1. **Proje Kopyalama:**

   ```bash
   git clone <repository-url>
   cd orderhub

   ```

2. **Bağımlılıkları Yükleme:**
   npm install

3. **Tailwind CSS'i Kurma:**
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

4. **Geliştirme Sunucusunu Başlatma:**
   npm start
   - Uygulama, varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

## Kullanım

1. Uygulamayı başlattıktan sonra, kullanıcı girişi yaparak kullanıcı ve sipariş listesini görüntüleyebilirsiniz.
2. Kullanıcı bilgilerini düzenlemek veya yeni bir kullanıcı eklemek için düzenleme sayfasına yönlendirilirsiniz.
3. Siparişleri görüntülemek ve düzenlemek için ilgili tabloları kullanabilirsiniz.

## Katkıda Bulunma

- Bu projeye katkıda bulunmak isterseniz, lütfen bir fork oluşturun ve pull request gönderin.

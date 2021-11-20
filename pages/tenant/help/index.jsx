import React from "react";

function index() {
  return (
    <div className="help-page lg:px-40 md:px-20 px-10 my-28">
      <h1 className="text-center font-bold text-4xl mb-10">
        Melakukan Penyewaan Gedung di RentVenue
      </h1>
      <ol className="text-xl list-decimal leading-10">
        <li>
          Sebelum melakukan penyewaan, pastikan anda telah login ke website
          RentVenue
        </li>
        <li>
          Setelah login, cari gedung yang ingin anda sewa. Pencarian Gedung
          berupa kota dan juga tanggal tersedianya gedung. Gedung juga dapat
          dicari berdasarkan kota dengan jumlah venue yang dimiliki
        </li>
        <li>
          Setelah anda memilih gedung yang ingin di sewa, lakukan pemesanan
          dengan melakukan booking dengan cara memilih tanggal yang tersedia
          lalu booking.
        </li>
        <li>
          Setelah itu anda akan diarahkan ke metode pembayaran. Pembayaran bisa
          menggunakan metode apapun.
        </li>
        <li>
          Setelah selesai, anda akan diarahkan ke halaman transaksi. Jika anda
          telah melakukan pembayaran, maka status pembayaran selesai dan anda
          akan memiliki kode check-in dan check-out.
        </li>
        <li>
          Kode check-in digunakan pada saat penggunaan gedung. Kode check-in
          diberikan kepada pemilik vendor yang nantinya vendor akan melakukan
          validasi terhadap kode tersebut. Kode check-in TIDAK DAPAT DIGUNAKAN
          ketika anda belum menggunakan gedung tersebut
        </li>
        <li>
          Kode check-out digunakan pada saat selesai penggunaan gedung. Kode
          check-out akan diberikan ketika anda sudah melakukan check-in.
        </li>
        <li>
          Setelah anda selesai melakukan check-out, anda dapat memberikan
          masukan terhadap gedung yang telah anda sewa pada form feedback yang
          telah disediakan pada halaman transaksi. Feedback berupa rating dan
          deskripsi
        </li>
      </ol>
    </div>
  );
}

export default index;

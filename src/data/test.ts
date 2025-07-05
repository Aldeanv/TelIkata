export type Correction = {
  correct: string[];
  explanation: string;
};

export type Sample = {
  original: string;
  corrections: {
    [index: number]: Correction;
  };
};

export type Difficulty = "mudah" | "menengah" | "sulit" | "challenge";

export const sampleBank: Record<Difficulty, Sample[]> = {
  mudah: [
    {
      original:
        "Keluarga kami pergi ke danau minggu lalu untuk berpiknik. Kami membawa makanan ringan, tikar dan bola untuk bermain. Saat tiba disana, kami mencari tempat yang nyaman dekat air. Ayah menyiapkan peralatan sementara ibu menghamparkan tikar. adik saya langsung berlarian ke arah danau dengan semangat.",

      corrections: {
        5: {
          correct: ["Minggu"],
          explanation:
            "Kata 'minggu' dalam kalimat ini merujuk pada 'nama hari', yaitu 'hari Minggu', bukan satuan waktu. Menurut PUEBI, nama hari dan bulan harus diawali dengan huruf kapital. Oleh karena itu, penulisan yang benar adalah 'Minggu lalu', bukan 'minggu lalu'.",
        },
        20: {
          correct: ["di", "sana"],
          explanation:
            "Kata 'disana' salah karena menggabungkan kata depan 'di' dan kata keterangan tempat 'sana'. Menurut PUEBI, jika 'di' berfungsi sebagai kata depan (penunjuk tempat), maka harus ditulis terpisah dari kata yang mengikutinya. Penulisan yang benar adalah 'di sana'.",
        },
        32: {
          correct: ["Ibu"],
          explanation:
            "Kata 'Ibu' harus diawali huruf kapital karena berfungsi sebagai sapaan atau pengganti nama orang tua, bukan sebagai kata umum. Sesuai PUEBI, sapaan seperti 'Ibu', 'Ayah', dan 'Adik' ditulis dengan huruf besar jika merujuk pada orang tertentu.",
        },
        35: {
          correct: ["Adik"],
          explanation:
            "Kata 'adik' berada di awal kalimat dan merujuk pada 'anggota keluarga tertentu' yang sedang dibicarakan. Pertama, menurut PUEBI, **setiap kalimat harus dimulai dengan huruf kapital**. Kedua, karena 'Adik' juga digunakan sebagai sapaan atau pengganti nama, maka penulisannya memang harus diawali dengan huruf kapital. Penulisan yang tepat adalah: 'Adik saya langsung berlarian...'",
        },
      },
    },
    {
      original:
        "pagi ini sekolah kami mengadakan upacara bendera untuk memperingati hari kemerdekaan. Semua siswa berkumpul dilapangan dengan memakai seragam lengkap. Kepala sekolah memberikan pidato tentang pentingnya cintah tanah air. Setelah itu, para siswa di arahkan untuk mengikuti lomba-lomba yang telah disiapkan panitia",

      corrections: {
        0: {
          correct: ["Pagi"],
          explanation:
            "Kalimat awal harus dimulai dengan huruf kapital. 'pagi ini...' seharusnya ditulis 'Pagi ini...'. Menurut PUEBI, huruf kapital digunakan sebagai huruf pertama kalimat.",
        },
        14: {
          correct: ["di", "lapangan"],
          explanation:
            "'Dilapangan' salah karena menggabungkan kata depan 'di' dan kata benda 'lapangan'. Kata depan 'di' harus **dipisahkan** dari kata yang mengikutinya jika menunjukkan tempat, sesuai PUEBI.",
        },
        25: {
          correct: ["cinta"],
          explanation:
            "Penulisan 'cintah' salah eja. Bentuk baku menurut KBBI adalah 'cinta', tanpa huruf 'h' di akhir.",
        },
        32: {
          correct: ["diarahkan"],
          explanation:
            "Penulisan 'di arahkan' salah karena **kata kerja pasif** yang menggunakan awalan 'di-' harus ditulis **serangkai** jika bukan kata depan. Karena 'diarahkan' adalah bentuk verba pasif, penulisan yang benar adalah satu kata.",
        },
        33: {
          correct: [""],
          explanation:
            "Penulisan 'di arahkan' salah karena **kata kerja pasif** yang menggunakan awalan 'di-' harus ditulis **serangkai** jika bukan kata depan. Karena 'diarahkan' adalah bentuk verba pasif, penulisan yang benar adalah satu kata.",
        },
        40: {
          correct: ["panitia."],
          explanation:
            "Kalimat terakhir tidak diakhiri tanda baca. Semua kalimat **harus diakhiri tanda titik (.)**, tanda tanya (?), atau tanda seru (!) sesuai konteks. Tambahkan titik setelah 'panitia'.",
        },
      },
    },
    {
      original:
        "pada saat liburan sekolah kemarin, kami pergi kerumah nenek dikampung. kami sangat senang karena bisa bermain dan membatu nenek memasak. selain itu, kami juga belajar mengenal tumbuhan dan hewan di sekitar rumahnya. Sepulang dari sana, kami merasa lelah, tetapi bahagia.",

      corrections: {
        0: {
          correct: ["Pada"],
          explanation:
            "Awal kalimat harus menggunakan huruf kapital, sesuai dengan kaidah PUEBI: 'Huruf kapital dipakai sebagai huruf pertama kata pada awal kalimat.' Oleh karena itu, 'pada saat liburan...' harus ditulis sebagai 'Pada saat liburan...'",
        },
        7: {
          correct: ["ke", "rumah"],
          explanation:
            "Gabungan kata 'kerumah' salah karena 'ke' di sini adalah kata depan yang menunjukkan arah atau tempat. Menurut PUEBI, kata depan seperti 'ke', 'di', 'dari' harus ditulis terpisah dari kata benda yang mengikutinya. Jadi, penulisan yang benar adalah 'ke rumah'.",
        },
        9: {
          correct: ["di", "kampung"],
          explanation:
            "Sama seperti 'ke rumah', kata 'dikampung' salah penulisan karena 'di' adalah kata depan lokasi. Kata depan harus dipisah dari kata yang mengikutinya. Maka bentuk bakunya adalah 'di kampung'.",
        },
        10: {
          correct: ["Kami"],
          explanation:
            "Kata 'kami' muncul setelah titik dan mengawali kalimat baru, sehingga harus diawali dengan huruf kapital. Ini mengikuti aturan PUEBI",
        },
        17: {
          correct: ["membantu"],
          explanation:
            "'membatu' adalah bentuk yang salah eja dari 'membantu'. Menurut KBBI, 'membatu' berarti menjadi keras seperti batu, sedangkan maksud kalimat ini adalah menolong nenek memasak. Maka, kata yang benar adalah 'membantu'.",
        },
      },
    },
  ],

  //// Level menengah ////

  menengah: [
    {
      original:
        "Dalam rangka memperingati hari bumi, sekolah kami mengadakan kegiatan bersih-bersih lingkungan dan menanam pohon. seluruh siswa diminta membawakantumbuhan yang akan ditanam disekitar halaman sekolah. sebagian dari mereka membelikan bibit di toko tanaman, sementara yang lain membawanya dari rumah masing-masing. kegiatan ini bertujuan untuk menumbuhkan kepedulian terhadap lingkungan sejak dini. guru-guru juga menyiapkan materi edukasi tentang dampak kerusakan alam dan cara-cara mencegahnya.",
      corrections: {
        "4": {
          correct: ["Bumi,"],
          explanation:
            "Istilah 'Hari Bumi' adalah nama peringatan resmi, sehingga menurut PUEBI Bab II Pasal 1.c, setiap unsur nama peristiwa resmi ditulis dengan huruf kapital.",
        },
        "14": {
          correct: ["Seluruh"],
          explanation:
            "'Seluruh' berada di awal kalimat setelah titik, sehingga harus diawali huruf kapital.",
        },
        "17": {
          correct: ["membawakan", "tumbuhan"],
          explanation:
            "'membawakantumbuhan' tidak memiliki spasi. Harus ditulis sebagai dua kata yang tepat: 'membawakan tumbuhan'. Ini termasuk kesalahan spasi dan ejaan.",
        },
        "21": {
          correct: ["di", "sekitar"],
          explanation:
            "'disekitar' salah karena 'di' sebagai kata depan harus dipisah dari kata benda yang mengikutinya. Penulisan benar: 'di sekitar'.",
        },
        "24": {
          correct: ["Sebagian"],
          explanation:
            "'Sebagian' berada di awal kalimat baru setelah titik, maka harus ditulis dengan huruf kapital.",
        },
        "27": {
          correct: ["membeli"],
          explanation:
            "'membelikan' kurang tepat secara makna karena kata tersebut biasanya berarti 'membeli untuk orang lain'. Dalam konteks ini, siswa membeli untuk diri sendiri. Maka kata yang tepat adalah 'membeli'.",
        },
        "49": {
          correct: ["Guru-guru"],
          explanation:
            "'guru-guru' berada di awal kalimat setelah titik. Maka harus ditulis 'Guru-guru' dengan huruf kapital.",
        },
        "53": {
          correct: ["edukatif"],
          explanation:
            "'materi edukasi' sebenarnya tidak baku dalam Bahasa Indonesia. Kata yang tepat dan sesuai KBBI adalah 'materi edukatif' untuk menjelaskan materi bersifat pendidikan.",
        },
      },
    },
    {
      original:
        "Pada hari sabtu lalu, kami mengikuti kegiatan kemah pramuka disebuah lapangan yang luas. disana, kami belajar mendirikan tenda, memasak diluar ruangan, dan bekerjasama dalam tim. kegiatan ini sangat menyenangkan meskipun cuaca cukup panas. saat malam tiba, kami berkumpul disekitar api unggun untuk mendengarkan cerita dari Kakak Pembina. beberapa teman saya bahkan menampilkan pertunjukan seni yang lucu dan kreatif. pengalaman ini membuat saya merasa lebih mandiri dan bertanggung jawab.",
      corrections: {
        "2": {
          correct: ["Sabtu"],
          explanation:
            "'sabtu' adalah nama hari, sehingga harus diawali huruf kapital. Sesuai PUEBI, nama hari selalu ditulis dengan huruf kapital.",
        },
        "9": {
          correct: ["di", "sebuah"],
          explanation:
            "'disebuah' salah karena 'di' sebagai kata depan harus dipisah dari kata yang mengikutinya. Penulisan yang benar adalah 'di sebuah'.",
        },
        "13": {
          correct: ["Di", "sana"],
          explanation:
            "'disana' salah karena terdiri dari kata depan 'di' + kata keterangan 'sana'. Selain itu, frasa ini berada di awal kalimat, jadi 'di' harus dipisah dan 'sana' diawali huruf kapital: 'Di sana'.",
        },
        "19": {
          correct: ["di", "luar"],
          explanation:
            "'diluar' salah penulisan. Kata depan 'di' harus dipisah dari kata tempat 'luar'. Penulisan baku: 'di luar'.",
        },
        "22": {
          correct: ["bekerja", "sama"],
          explanation:
            "'bekerjasama' salah karena dalam konteks ini, 'bekerja' adalah verba dan 'sama' adalah pelengkap. Maka harus ditulis terpisah: 'bekerja sama'.",
        },
        "25": {
          correct: ["Kegiatan"],
          explanation:
            "'kegiatan' berada di awal kalimat baru setelah titik. Maka harus diawali huruf kapital: 'Kegiatan'.",
        },
        "33": {
          correct: ["Saat"],
          explanation:
            "'saat' mengawali kalimat baru setelah titik. Maka harus diawali huruf kapital.",
        },
        "38": {
          correct: ["di", "sekitar"],
          explanation:
            "'disekitar' salah. 'di' sebagai kata depan harus dipisah dari kata 'sekitar'. Penulisan yang benar: 'di sekitar'.",
        },
        "47": {
          correct: ["Beberapa"],
          explanation:
            "'beberapa' berada di awal kalimat, harus ditulis dengan huruf kapital.",
        },
      },
    },
  ],

  //// Level suli ////

  sulit: [
    {
      original:
        "banyak pelajar sekarang lebih memilih mencari informasi dari internet dibandingkan membaca buku. hal ini tidak sepenuhnya salah, namun sering kali membuat mereka menjadi malas untuk memahami materi secara mendalam. mereka terkadang hanya menghapal tanpa benar-benar mengerti isi pelajarannya. selain itu, kebiasaan copy paste dari berbagai situs juga menyebabkan turunnya kemampuan berpikir kritis. dilingkungan sekolah, guru harus memberikan pengarahan tentang pentingnya memahami sumber informasi dengan benar. jika tidak ditangani, kebiasaan ini bisa berdampak panjang terhadap kualitas pendidikan. terlebih lagi, minimnya literasi digital juga memperparah keadaan. siswa perlu di bekali dengan keterampilan untuk menilai apakah sebuah informasi layak dipercaya atau tidak. oleh sebab itu, sinergi antara sekolah, orangtua dan pemerintah menjadi hal yang sangat dibutuhkan.",
      corrections: {
        "0": {
          correct: ["Banyak"],
          explanation:
            "Kalimat harus diawali dengan huruf kapital. PUEBI mewajibkan huruf kapital di awal kalimat.",
        },
        "12": {
          correct: ["Hal"],
          explanation:
            "Awal kalimat baru setelah titik harus menggunakan huruf kapital: 'Hal ini...'.",
        },
        "32": {
          correct: ["menghafal"],
          explanation:
            "Ejaan baku menurut KBBI adalah 'menghafal', bukan 'menghapal'.",
        },
        "52": {
          correct: ["Di", "lingkungan"],
          explanation:
            "Gabungan 'dilingkungan' salah karena 'di' adalah kata depan. Harus dipisah: 'di lingkungan'.",
        },
        "86": {
          correct: ["dibekali"],
          explanation:
            "Kata kerja pasif 'dibekali' harus ditulis serangkai, bukan 'di bekali'.",
        },
        "87": {
          correct: [""],
          explanation:
            "Kata kerja pasif 'dibekali' harus ditulis serangkai, bukan 'di bekali'.",
        },
        "105": {
          correct: ["orang", "tua"],
          explanation:
            "'Orangtua' ditulis terpisah jika merujuk pada ayah dan ibu sebagai satuan.",
        },
      },
    },
  ],
  challenge: [
    {
      original:
        "pagi itu udara terasa sejuk dan langit sedikit mendung. warga mulai berdatangan ke lapangan utama untuk mengikuti kegiatan festival budaya tahunan. acara ini merupakan bentuk pelestarian tradisi lokal yang telah dilakukan turun menurun. berbagai stand disiapkan sejak malam sebelumnya oleh panitia yang bekerjasama dengan karang taruna. tenda-tenda dihiasi kain batik dan anyaman bambu, menciptakan suasana yang kental akan nuansa etnik. anak-anak terlihat antusias mengenakan pakaian adat dan membawa bendera kecil sambil bernyanyi lagu daerah. beberapa pengunjung asing pun tampak tertarik dan mengabadikan momen tersebut menggunakan kamera. selain pertunjukan seni, tersedia juga berbagai lomba rakyat seperti balap karung, tarik tambang, dan panjat pinang. sebelum acara dimulai, ketua panitia menyampaikan sambutan sambil menekankan pentingnya menjaga warisan budaya leluhur. suasana semakin meriah ketika tarian tradisional dimulai. para penari bergerak dengan luwes mengikuti irama gamelan yang mengalun dari pengeras suara. disekeliling panggung, penonton bersorak sambil bertepuk tangan. disela keramaian, beberapa relawan membagikan brosur tentang sejarah daerah dan asal-usul festival ini. stand makanan juga dipenuhi pengunjung yang ingin mencicipi hidangan khas seperti serabi, sate lilit, dan es dawet. aroma rempah menggoda dari dapur terbuka yang ada dibagian timur lapangan. ibu-ibu tampak sibuk mengaduk adonan dan menggoreng pisang menggunakan kuali besar. menjelang siang, cuaca mulai panas namun tidak menyurutkan semangat peserta. lomba panjat pinang menjadi acara yang paling dinantikan, dan sorak sorai pecah saat peserta berhasil meraih hadiah diatas batang yang licin. sorotan kamera televisi lokal ikut merekam kegembiraan yang terpancar diwajah setiap peserta. dipenghujung acara, panitia membagikan sertifikat dan hadiah kepada pemenang lomba. semua orang terlihat puas meskipun pakaian mereka basah oleh keringat. suara gamelan pelan-pelan meredup, menandai akhir kegiatan yang penuh kebersamaan dan tawa. beberapa pengunjung masih asyik mengambil foto atau bercengkrama dibawah pohon rindang. festival ini bukan sekadar hiburan, melainkan cara masyarakat mengenal dan mencintai warisan budayanya sendiri. harapannya, acara seperti ini terus dilakukan secara berkelanjutan agar generasi muda tidak melupakan akar identitas mereka.",
      corrections: {
        "0": {
          correct: ["Pagi"],
          explanation: "Huruf kapital digunakan di awal kalimat.",
        },
        "9": {
          correct: ["Warga"],
          explanation: "Setelah titik, kata harus diawali huruf kapital.",
        },
        "31": {
          correct: ["turun-temurun."],
          explanation:
            "'Turun menurun' bukanlah kata yang baku dan kata 'turun temurun' seharusnya ditulis dengan tanda hubung karena merupakan bentuk kata ulang.",
        },
        "32": {
          correct: [""],
          explanation:
            "'Turun menurun' bukanlah kata yang baku dan kata 'turun temurun' seharusnya ditulis dengan tanda hubung karena merupakan bentuk kata ulang.",
        },
        "42": {
          correct: ["bekerja", "sama"],
          explanation:
            "'bekerjasama' harus dipisah karena 'bekerja' dan 'sama' bukan imbuhan satu kesatuan.",
        },
        "136": {
          correct: ["Di", "sekeliling"],
          explanation:
            "'disekeliling' bisa diganti 'di sekeliling' karena 'di' adalah kata depan yang wajib dipisah.",
        },
        "143": {
          correct: ["di", "sela"],
          explanation: "'disela' salah penulisan, harus dipisah: 'di sela'.",
        },
        "181": {
          correct: ["di", "bagian"],
          explanation:
            "'dibagian' salah karena 'di' sebagai kata depan harus dipisah.",
        },
        "184": {
          correct: ["Ibu-ibu"],
          explanation:
            "Sapaan di awal kalimat harus menggunakan huruf kapital.",
        },
        "222": {
          correct: ["di", "atas"],
          explanation:
            "Penulisan 'diatas' salah karena 'di' sebagai kata depan tidak boleh digabung.",
        },
        "235": {
          correct: ["di", "wajah"],
          explanation:
            "'diwajah' adalah kesalahan umum, harus dipisah sesuai kaidah PUEBI.",
        },
        "238": {
          correct: ["Di", "penghujung"],
          explanation:
            "'dipenghujung' perlu diubah jadi 'di penghujung' dan diawali huruf kapital karena awal kalimat.",
        },
        "278": {
          correct: ["di", "bawah"],
          explanation:
            "'dibawah' salah, karena 'di' adalah kata depan yang tidak boleh digabung.",
        },
        "295": {
          correct: ["Harapannya"],
          explanation: "'harapannya' di awal kalimat harus diawali kapital.",
        },
      },
    },
  ],
};

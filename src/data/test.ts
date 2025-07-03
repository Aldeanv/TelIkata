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
        "Kemarin saya berbelanja dipasar dan membeli sayur, buah dan ikan segar. Penjualnya ramah dan harga-harga disana lebih murah darlpada supermarket. Saya senang sekali belanja disitu.",
      corrections: {
        3: {
          correct: ["di", "pasar"],
          explanation:
            "'di pasar' harus dipisah karena 'di' adalah kata depan.",
        },
        7: {
          correct: ["buah,"],
          explanation: "Gunakan koma sebelum 'dan' dalam daftar.",
        },
        15: {
          correct: ["di", "sana"],
          explanation: "Penulisan kata depan 'di' harus dipisah: 'di sana'.",
        },
        18: {
          correct: ["daripada"],
          explanation:
            "Penulisan yang benar adalah 'daripada', bukan 'darlpada'.",
        },
        24: {
          correct: ["di", "situ."],
          explanation: "Penulisan yang benar adalah 'di situ', bukan 'disitu'.",
        },
      },
    },
    // Tambahkan soal mudah lainnya...
  ],
  menengah: [
    {
      original:
        "Kemarin saya mengikuti seminar tentang pengunaan teknologi dalam pendidikan. Acaranya diadakan dikampus dan dihadiri oleh guru-guru dari berbagai sekolahan. Saya merasa sangat terinspirasi oleh pembicara yang menyampaikan materi dengan jelas dan menarik. Disela-sela sesi, kami diberi kesempatan untuk berdiskusi dan bertukar pikiran. Selain itu, kami juga mendapatkan snack dan minuman ringan. Dilingkungan acara, panitia menyediakan tempat sampah dan papan pengumuman yang membantu peserta. Meski acaranya sederhana, namun manfaatnya sangat berharga bagi perkembangan saya.",
      corrections: {
        5: {
          correct: ["penggunaan"],
          explanation:
            "Ejaan yang benar adalah 'penggunaan', bukan 'pengunaan'.",
        },
        11: {
          // Changed from 10 to 11
          correct: ["di", "kampus"],
          explanation:
            "'di kampus' harus dipisah karena 'di' adalah kata depan.",
        },
        18: {
          // Changed from 14 to 18
          correct: ["sekolah."],
          explanation:
            "'Sekolahan' adalah bentuk tidak baku. Gunakan 'sekolah'.",
        },
        32: {
          // Changed from 19 to 32
          correct: ["Di", "sela-sela"],
          explanation:
            "'Di sela-sela' harus dipisah karena 'Di' adalah kata depan.",
        },
        47: {
          // Changed from 25 to 47
          correct: ["snack,"],
          explanation: "Gunakan koma untuk memisahkan dalam daftar.",
        },
        51: {
          // Changed from 28 to 51
          correct: ["Di", "lingkungan"],
          explanation: "Penulisan 'Di lingkungan' harus dipisah.",
        },
        59: {
          // Changed from 33 to 59
          correct: ["pengumuman,"],
          explanation: "Tambahkan koma sebelum konjungsi 'dan'.",
        },
        63: {
          // Changed from 38 to 63
          correct: ["Meskipun"],
          explanation:
            "Gunakan 'Meskipun', bukan 'meski' dalam kalimat baku formal.",
        },
        71: {
          // Changed from 42 to 71
          correct: ["perkembangan", "diri"],
          explanation: "Tambahkan 'diri' agar makna lebih tepat.",
        },
      },
    },
  ],
  sulit: [
    {
      original:
        "Banyak siswa yang belum menyadari pentingnya keterampilan komunikasi lisan maupun tulisan. Hal ini terjadi karena mereka lebih fokus pada pelajaran yang bersifat teoritis dan menganggap komunikasi sebagai hal yang sepele. Dikelas, sebagian besar siswa jarang bertanya atau menyampaikan pendapatnya. Padahal, kemampuan berbicara di depan umum merupakan keterampilan yang sangat dibutuhkan dilingkungan akademik maupun dunia kerja. Sebuah penelitian menunjukan bahwa siswa yang aktif berdiskusi cenderung lebih percaya diri. Sayangnya, metode pengajaran disekolah belum menekankan pada aspek komunikasi secara menyeluruh. Para guru lebih menekankan hafalan dibandingkan pelatihan berbicara. Selain itu, kurangnya kesempatan untuk tampil di depan teman-teman juga menjadi kendala. Oleh karna itu, penting bagi pihak sekolah untuk menyediakan program pelatihan yang dapat melatih keberanian dan kejelasan berbicara siswa.",
      corrections: {
        30: {
          correct: ["Di", "kelas,"],
          explanation:
            "'Di kelas' harus dipisah karena 'Di' adalah kata depan.",
        },
        50: {
          correct: ["di", "lingkungan"],
          explanation: "'di lingkungan' harus dipisah.",
        },
        57: {
          correct: ["menunjukkan"],
          explanation: "Ejaan yang benar adalah 'menunjukkan'.",
        },
        62: {
          correct: ["berdiskusi,"],
          explanation: "Tambahkan koma sebelum kata sambung.",
        },
        70: {
          correct: ["di", "sekolah"],
          explanation: "Penulisan yang benar adalah 'di sekolah'.",
        },
        72: {
          correct: ["penekanan"],
          explanation: "Gunakan kata benda 'penekanan', bukan bentuk kerja.",
        },
        83: {
          correct: ["dibanding"],
          explanation: "Gunakan bentuk baku 'dibandingkan'.",
        },
        99: {
          correct: ["karena"],
          explanation: "Penulisan yang benar adalah 'karena', bukan 'karna'.",
        },
        115: {
          correct: ["berbicara."],
          explanation: "Perlu tanda titik untuk mengakhiri kalimat.",
        },
      },
    },
  ],
  challenge: [
    {
      original:
        "Hari ini saya pergi kekantor untuk menyelesaikan pekerjaan. Saya bertemu temen lama dan kita makan siang bersama. Disana saya memesan nasi goreng dan es teh manis. Harganya tidak terlalu mahal tetapi rasanya enak sekali. Saya juga membeli oleh-oleh untuk keluarga dirumah. Setelah itu saya pulang kerumah dengan perasaan senang.",
      corrections: {
        3: {
          correct: ["ke", "kantor"],
          explanation:
            "'ke kantor' harus dipisah karena 'ke' adalah kata depan.",
        },
        6: {
          correct: ["teman"],
          explanation: "Penulisan yang benar adalah 'teman', bukan 'temen'.",
        },
        10: {
          correct: ["Di", "sana"],
          explanation:
            "'Di sana' harus dipisah dan diawali huruf kapital karena di awal kalimat.",
        },
        16: {
          correct: ["tetapi,"],
          explanation:
            "Gunakan koma sebelum konjungsi 'tetapi' jika diikuti klausa lengkap.",
        },
        22: {
          correct: ["di", "rumah"],
          explanation:
            "'di rumah' harus dipisah karena 'di' adalah kata depan.",
        },
        25: {
          correct: ["ke", "rumah"],
          explanation:
            "'ke rumah' harus dipisah karena 'ke' adalah kata depan.",
        },
        28: {
          correct: ["perasaan"],
          explanation:
            "Penulisan yang benar adalah 'perasaan', bukan 'perasaan'.",
        },
      },
    },
    {
      original:
        "Pada hari minggu yang cerah, saya dan keluarga memutuskan untuk pergi liburan ke Bali. Kami berangkat dari Jakarta pagi-pagi sekali menggunakan pesawat. Disbandara, kami bertemu dengan seorang turis asing yang tersesat dan membantunya menemukan gate keberangkatan. Setelah sampai di Bali, kami langsung menuju penginapan yang sudah dipesan sebelumnya. Penginapannya sangat nyaman dan memiliki kolam renang yang besar. Keesokan harinya, kami mengunjungi pantai Kuta. Disana, kami bermain air, berjemur, dan mencoba berbagai kuliner khas Bali seperti babi guling dan sate lilit. Saya juga membeli oleh-oleh seperti kaos dan kerajinan tangan untuk temen-temen dikantor. Pada hari ketiga, kami menyewa motor untuk menjelajahi tempat wisata lain seperti Ubud dan Tanah Lot. Pemandangan disana sangat indah dan saya mengambil banyak foto. Sayangnya, cuaca tidak selalu mendukung sehingga kami harus membawa payung kemana-mana. Meskipun begitu, liburan kali ini sangat berkesan dan saya berharap bisa kembali lagi diwaktu yang akan datang. Sebelum pulang, kami sempat mampir kedapur sebuah warung untuk mencoba kopi luwak yang terkenal. Rasanya unik dan aromanya sangat harum. Sesampainya dirumah, saya langsung membagikan oleh-oleh kepada tetangga dan keluarga.",
      corrections: {
        2: {
          correct: ["Minggu"],
          explanation: "Nama hari harus diawali huruf kapital: 'Minggu'.",
        },
        10: {
          correct: ["di", "bandara"],
          explanation:
            "'di bandara' harus dipisah karena 'di' adalah kata depan.",
        },
        15: {
          correct: ["gate"],
          explanation:
            "Kata serapan yang benar adalah 'gerbang' (atau 'gate' jika istilah bandara).",
        },
        22: {
          correct: ["Di", "sana"],
          explanation:
            "'Di sana' harus dipisah dan diawali huruf kapital jika di awal kalimat.",
        },
        28: {
          correct: ["teman-teman"],
          explanation:
            "Penulisan yang benar adalah 'teman-teman', bukan 'temen-temen'.",
        },
        29: {
          correct: ["di", "kantor"],
          explanation:
            "'di kantor' harus dipisah karena 'di' adalah kata depan.",
        },
        36: {
          correct: ["di", "sana"],
          explanation: "'di sana' harus dipisah.",
        },
        42: {
          correct: ["ke", "mana-mana"],
          explanation:
            "'ke mana-mana' harus dipisah karena 'ke' adalah kata depan.",
        },
        50: {
          correct: ["di", "waktu"],
          explanation:
            "'di waktu' harus dipisah karena 'di' adalah kata depan.",
        },
        54: {
          correct: ["ke", "dapur"],
          explanation:
            "'ke dapur' harus dipisah karena 'ke' adalah kata depan.",
        },
        63: {
          correct: ["di", "rumah"],
          explanation: "'di rumah' harus dipisah.",
        },
        65: {
          correct: ["oleh-oleh"],
          explanation:
            "Penulisan yang benar adalah 'oleh-oleh' (dengan tanda hubung).",
        },
        5: {
          correct: ["liburan"],
          explanation:
            "Kata 'liburan' sebaiknya diganti 'berlibur' untuk struktur kalimat lebih baik.",
        },
        13: {
          correct: ["penginapan"],
          explanation:
            "Lebih formal jika menggunakan 'hotel' atau 'akomodasi'.",
        },
        19: {
          correct: ["kuliner"],
          explanation:
            "Kata 'makanan' lebih umum digunakan daripada 'kuliner' dalam konteks ini.",
        },
        33: {
          correct: ["motor"],
          explanation: "Lebih tepat 'sepeda motor' untuk kejelasan.",
        },
        45: {
          correct: ["berkesan"],
          explanation: "Bisa diganti 'tak terlupakan' untuk variasi diksi.",
        },
        56: {
          correct: ["warung"],
          explanation:
            "Kata 'warung' kurang formal, bisa diganti 'restoran kecil'.",
        },
        60: {
          correct: ["harum"],
          explanation: "Kata 'wangi' lebih umum digunakan untuk kopi.",
        },
      },
    },
  ],
};

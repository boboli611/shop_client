const data = [
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  },
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  },
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  },
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  },
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  },
  {
            img: 'https://bpic.588ku.com/back_pic/00/15/30/5756ebe404845bb.jpg!ww800',
            name: 'INS款牛仔裤INS款牛仔INS款牛仔裤INS款牛仔',
            price: '399',
            payedNumber: '34567'
  }
];

module.exports = () => {
  let random = Math.random();
  return random > 0.5? data : []
};
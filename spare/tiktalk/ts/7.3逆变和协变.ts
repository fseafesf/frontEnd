interface fans {
  call: any;
}

interface IKun extends fans {
  sing: any;
  dance: any;
  basketball: any;
}

interface SuperIKun extends IKun {
  rap: any;
}

// let fans: fans = {
//   call: "",
// };

// let ikun: IKun = fans;

let ikun: IKun = {
  sing: "",
  dance: "",
  basketball: "",
  call: "",
};

let fans: fans = ikun;

type Transfrom = (x: IKun) => IKun;
type SubTransfrom = (x: fans) => SuperIKun;

const subTransfrom: SubTransfrom = (x) => {
  return x as any;
};

const transfrom: Transfrom = subTransfrom;

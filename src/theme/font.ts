import { TextStyle } from "react-native"

const size  = {
    xs : 10 ,
    s : 12 ,
    default : 15 , 
    md : 16 ,
    lg : 20 , 
    xlg : 24 , 
    xxlg : 30 , 
    xxxlg : 40, 
}
const weight : {[key:string]: TextStyle['fontWeight']} = {
    thin: '100',
    ultraLight: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
    black: '900',
}
  
export default { size , weight }
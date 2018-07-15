import { createComponent} from 'react-fela'
const button = ()=> ({
  padding: '7px',
  border: '0',
  'border-radius': '5px',
  'background-color': 'purple',//$color-secondary;
  'color':  'yellow',//$background-primary;
})


export default createComponent(button, 'button')
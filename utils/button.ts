import { ButtonType } from "types/buttons-data";

export function getButtonAppearance(type: ButtonType, theme: string) {
    // if (type === 'primary') {
    //   // if (theme === 'light') {
    //   //   // Dark primary button on a light theme
    //   //   return 'dark'
    //   // }
    //   // // Fully white primary button on a dark theme
    //   // return 'white'

    // }
    if (type === 'secondary') {
      if (theme === 'light') {
        // Dark outline primary button on a light theme
        return 'secondary-light'
      }
      // White outline primary button on a dark theme
      return 'secondary-dark'
    }
  
    // Shouldn't happen, but default to dark button just in case
    return 'primary'
}
  
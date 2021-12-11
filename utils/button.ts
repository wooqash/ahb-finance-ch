import { ButtonType } from "types/buttons-data";

export function getButtonAppearance(type: ButtonType, background: string) {
    if (type === 'primary') {
      if (background === 'light') {
        // Dark primary button on a light background
        return 'dark'
      }
      // Fully white primary button on a dark background
      return 'white'
    }
    if (type === 'secondary') {
      if (background === 'light') {
        // Dark outline primary button on a light background
        return 'dark-outline'
      }
      // White outline primary button on a dark background
      return 'white-outline'
    }
  
    // Shouldn't happen, but default to dark button just in case
    return 'dark'
}
  
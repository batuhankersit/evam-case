export const isClientSide = (): boolean => typeof window !== "undefined"

export const getItemFromStorage = (key:string,defaultValue:any) => {
  if(isClientSide()){
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  }
}

export const setItemOnStorage = (key:string,value:any) => {
  if(isClientSide()){
    return window.localStorage.setItem(key,JSON.stringify(value))
  }
}
export { default as AppNavigationMenu } from './NavigationMenu.vue'
export { default as UiNavigationMenuContent } from './NavigationMenuContent.vue'
export { default as UiNavigationMenuIndicator } from './NavigationMenuIndicator.vue'
export { default as UiNavigationMenuItem } from './NavigationMenuItem.vue'
export { default as UiNavigationMenuLink } from './NavigationMenuLink.vue'
export { default as UiNavigationMenuList } from './NavigationMenuList.vue'
export { default as UiNavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as UiNavigationMenuViewport } from './NavigationMenuViewport.vue'

import { cva } from 'class-variance-authority'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
)export { default as NavigationMenuContent } from './NavigationMenuContent.vue'
export { default as NavigationMenuIndicator } from './NavigationMenuIndicator.vue'
export { default as NavigationMenuItem } from './NavigationMenuItem.vue'
export { default as NavigationMenuLink } from './NavigationMenuLink.vue'
export { default as NavigationMenuList } from './NavigationMenuList.vue'
export { default as NavigationMenuTrigger } from './NavigationMenuTrigger.vue'
export { default as NavigationMenuViewport } from './NavigationMenuViewport.vue'

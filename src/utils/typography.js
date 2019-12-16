import Typography from 'typography'
import Wordpress2016 from 'typography-theme-wordpress-2016'

Wordpress2016.overrideThemeStyles = () => {
  return {
    '.highlight': {
      backgroundColor: '#a4ffd9',//'#5ee2bd',
      padding: '0.125rem 0',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    dfn: {
      borderBottom: `3px double`,
    },
    'main p': {
      textAlign: `justify`,
    },
    '.gatsby-resp-image-wrapper + p': {
      marginTop: '2rem',
    }
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography({
  ...Wordpress2016,
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

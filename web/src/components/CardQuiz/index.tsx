import React from 'react'
import { Container, HeaderCardQuiz, MenuItemStyled } from './style'
import { FiMoreHorizontal, FiTrash, FiEdit } from 'react-icons/fi'
import { UTILS } from '../../constants/utils'
import { IconButton, Grow, Paper, Popper, MenuList } from '@material-ui/core'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(0),
  },
  button: {
    display: 'flex',
    background: 'red',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
}))

type toggleMenuItems = {
  icon: JSX.Element
  text: string
  onclick: (id: string) => void
}

const CardQuiz: React.FC<{
  header: string
  background?: string
  toggleItems?: toggleMenuItems[]
  width?: string
  itemId?: string
  theme?: {
    primary?: string
    secondary?: string
    mainBg?: string
    contrastText?: string
    wrong?: string
    success?: string
  }
}> = ({ children, header, background, width, theme, toggleItems, itemId }) => {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpen(false)
  }

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  return (
    <Container background={background} width={width} themeCustom={theme}>
      <HeaderCardQuiz themeCustom={theme}>
        <p>{header}</p>
        {toggleItems && (
          <IconButton
            ref={anchorRef}
            style={{
              display: 'flex',
              padding: 2,
            }}
            // aria-controls={open ? 'menu-list-grow' : undefined}
            onClick={handleToggle}
          >
            <FiMoreHorizontal size={25} color={UTILS.theme.colors.primary} />
          </IconButton>
        )}
      </HeaderCardQuiz>
      <div>
        {toggleItems && (
          <div>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                        style={{
                          background: UTILS.theme.colors.primary,
                          color: UTILS.theme.colors.contrastText,
                        }}
                      >
                        {toggleItems.map(item => (
                          <MenuItemStyled
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            onClick={() => item.onclick(itemId)}
                          >
                            {item.icon}
                            {item.text}
                          </MenuItemStyled>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        )}
      </div>
      <div className="img-cover"></div>
      <div className="content">{children}</div>
    </Container>
  )
}

export default CardQuiz

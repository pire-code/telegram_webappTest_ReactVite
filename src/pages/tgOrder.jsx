import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        green: {
            main: '#26d413',
            light: '#E9DB5D',
            dark: '#A29415',
            contrastText: '#242105',
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& label': {
                        color: '#ffffff7f',
                    },
                    '& label.Mui-focused': {
                        color: 'var(--tg-theme-button-color)'
                    },
                    '&, .MuiInputBase-root': {
                        color: '#FFF'
                    },
                    '&, .MuiFormHelperText-root': {
                        color: '#FFFFFF5F'
                    }, '& input.Mui-focused': {
                        color: '#ffffff5f',
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    '&, &:hover': {
                        background: '#ffffff0f',
                    }, 
                        '&:before, &:after': {
                          borderBottom: '2px solid var(--tg-theme-button-color)',
                        },
                        '&:hover:not(.Mui-disabled, .Mui-error):before': {
                          borderBottom: '2px solid var(--tg-theme-button-color)',
                        },
                        '&.Mui-focused:after': {
                          borderBottom: '2px solid var(--tg-theme-button-color)',
                        },
                },
            },
        },
    },
});

export const TgOrder = () => {
    const WebApp = window.Telegram.WebApp;
    console.log(WebApp)
    
    WebApp.expand()
    var MainButton = WebApp.MainButton;

    
    return (<>
        <ThemeProvider theme={theme}>
            <section>
                <div>Hola</div>
                <TextField label="Filled" variant="filled"
                    helperText="Please enter your name" margin="normal" color='green' autoComplete='false' />
                <button onClick={
                    () => MainButton.show()}>Click me</button>
                    <span>{WebApp.initDataUnsafe.user.id}</span>
        </section>
    </ThemeProvider >
    </>)
}
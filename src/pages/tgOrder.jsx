/* eslint-disable no-unused-vars */
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

import { MainButton, useShowPopup, useInitData, useExpand, WebAppProvider } from '@vkruglikov/react-telegram-web-app';
import { useState } from 'react';

import axios from '../axios.js'
import { useForm } from 'react-hook-form';


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
                        borderBottom: '2px solid #000',
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
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    '&.MuiMenuItem-root': {
                        color: '#000',
                    },
                    '&.Mui-selected': {
                        color: 'var(--tg-theme-button-color)',
                        background: '#272727'
                    },
                    '&.Mui-selected:hover': {
                        color: 'var(--tg-theme-button-color)',
                        background: '#272727'
                    },
                    '&.Mui-focusVisible.Mui-selected': {
                        color: 'var(--tg-theme-button-color)',
                        background: '#272727'
                    }
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    '&': {
                        color: '#FFFFFF5F'
                    }
                }
            }
        }

    },
});

export const TgOrder = () => {

    const { doOrder, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        axios.post('/order', data)
    }
    console.log(errors);

    const [initDataUnsafe, initData] = useInitData();
    const [isExpanded, expand] = useExpand();
    const [selectedType, setType] = useState('сайт')

    if (!isExpanded) {
        expand()
    }

    const handleChangeType = (e) => {
        if (e.target.value === 'site') {
            setType('сайт')
        } else if (e.target.value === 'tg') {
            setType('телеграм бот')
        }
    }

    return (<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <WebAppProvider>
                <ThemeProvider theme={theme}>
                    <section>
                        <h1>Hola{initDataUnsafe.user && (', ' + initDataUnsafe.user.first_name + ' ' + initDataUnsafe.user.last_name)}!</h1>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Что делаем?"
                            fullWidth
                            margin='normal'
                            variant='filled'
                            onChange={(e) => handleChangeType(e)}
                            {...doOrder("type", { required: true })}
                        >
                            <MenuItem value='site'>Сайт</MenuItem>
                            <MenuItem value='tg'>Телеграм бот</MenuItem>
                        </TextField>
                        <TextField label="О проекте" variant="filled" fullWidth
                            {...doOrder("aboutProj", { required: true })}
                            helperText={`Для какого проекта нужен ${selectedType}?`} margin="normal" color='green' multiline rows={2} autoComplete='false' />
                        {initDataUnsafe.user && (<input type='hidden' value={initDataUnsafe.user.id} />)}
                        <TextField label="Техническое задание" variant="filled"

                            {...doOrder("textOrder", { required: true })}
                            helperText="Описание того, что вам нужно. Если ещё сами не знаете - не волнуйтесь, я помогу вам с составлением его, в таком случае можете написать основные пожелания или оставить поле пустым ;)"
                            margin="normal" multiline rows={3} color='green' fullWidth autoComplete='false'
                        />
                        <span>
                            <TextField label="Бюджет"
                                type="number" variant='filled' margin='normal'
                                aria-describedby="ht-budget"
                                autoComplete='off'
                                sx={{ width: '60%', marginBottom: 0 }}
                                {...doOrder("budget", {required: true})} />
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Валюта"
                                fullWidth
                                margin='normal'
                                variant='filled'
                                defaultValue="USD"
                                sx={{ width: '35%', marginBottom: 0 }}
                                {...doOrder("vault", {required: true})}
                            >
                                <MenuItem value='USD'> $ USD</MenuItem>
                                <MenuItem value='EUR'> € EUR</MenuItem>
                                <MenuItem value='UAH'> ₴ UAH</MenuItem>
                                <MenuItem value='RUB'> ₽ RUB</MenuItem>
                            </TextField>
                        </span>
                        <FormHelperText sx={{ marginLeft: 1.5, marginTop: 0, marginBottom: 1.5 }} id='ht-budget'>Ориентировочный бюджет</FormHelperText>
                    </section>
                    <MainButton text="Отправить" type="submit"/>
                </ThemeProvider >
            </WebAppProvider>
        </form>
    </>)
}
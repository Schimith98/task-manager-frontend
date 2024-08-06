import { Box, CircularProgress } from "@mui/material"

const FullPageLoader = () =>  {
    return <Box 
        position={'absolute'} 
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'}
        bgcolor={'rgba(0,0,0,0.2)'}
        width={'100vw'}
        height={'100vh'}
        top={0}
        >
        <CircularProgress size={70}/>
    </Box>
}

export default FullPageLoader;
import react from 'react'
import Carousel from 'react-elastic-carousel'

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
];




const ClaimsCarsousel = () => {

    const {
        data: claims,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetClaimsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    return(
        <>
            <h1 style={{textAlign: 'center'}}>React Elastic Carousel</h1>
            <div className="carousel-component">
                <Carousel breakPoints={breakPoints}>
                    <Item>One</Item>
                    <Item>Two</Item>
                    <Item>Three</Item>
                    <Item>Four</Item>
                    <Item>Five</Item>
                    <Item>Six</Item>
                    <Item>Seven</Item>
                    <Item>Eight</Item>
                </Carousel>
            </div>
        </>
    )
}
export default ClaimsCarsousel;
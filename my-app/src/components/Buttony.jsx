import { Button, ButtonGroup } from '@progress/kendo-react-buttons';


export const Buttony = () => {

    const handleButtonClick = () => {
        console.log("click");
        alert("KendoReact Button was clicked.");
     }

    return (
        <section style={{width: "100%"}}>
            <ButtonGroup>
                <Button look="flat" style={{width: "100%", margin: "10px"}} onClick={handleButtonClick} themeColor={"light"} >Next High Tide</Button>
                <Button look="flat" style={{width: "100%", margin: "10px"}} icon="calendar" onClick={handleButtonClick} themeColor={"light"} >High Tides for the Week</Button>
            </ButtonGroup>
        </section>
    );
}
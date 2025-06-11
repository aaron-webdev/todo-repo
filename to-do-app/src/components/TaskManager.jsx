import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';



export default function TaskManager()
{



    return(
    <>
        <Container className='text-center'>
            <h1>Task Master</h1>
            <div id='interactiveSection'>
                <Row>
                    <Col id='filters' className='d-flex flex-column'>
                        <h4>Filters</h4>
                        <Button>Complete</Button>
                        <Button>Incomplete</Button>
                        <Button>All</Button>
                    </Col>
                </Row>

            </div>
        </Container>
    </>

    )
}
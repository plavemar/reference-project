import * as React from "react";
import {Container, Grid, Menu, Segment} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import {Link} from "react-router-dom";

const Navigation: React.FunctionComponent = () => {
    return (
        <Container>
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Link to={"depreciationCalc"}>Odpisová kalkulačka</Link>
                        <Link to={"about"}>O kalkulačce</Link>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>Kalkulačka pro výpočet daňových odpisů</Segment>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default Navigation;

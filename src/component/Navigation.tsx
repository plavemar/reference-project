import * as React from 'react';
import {useContext, useState} from 'react';
import {Container, Grid, Menu, Segment} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import {Link} from "react-router-dom";

const Navigation: React.FunctionComponent = () => {

    const [activeItem, setActiveItem] = useState<string>('depreciationCalc');

    const onMenuItemClick = (event: React.MouseEvent) => {

    }

    return (
        <Container>
            <Grid>
                <Grid.Column width={4}>
                    <Menu fluid vertical tabular>
                        <Menu.Item
                            name='depreciationCalc'
                            active={activeItem === 'depreciationCalc'}
                            onClick={onMenuItemClick}
                        >
                            <Link to={'depreciationCalc'}>Odpisová kalkulačka</Link>
                        </Menu.Item>
                        <Menu.Item
                            name='about'
                            active={false}
                            onClick={onMenuItemClick}
                        >
                            <Link to={'about'}>O kalkulačce</Link>
                        </Menu.Item>
                    </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
                    <Segment>
                        Kalkulačka pro výpočet daňových odpisů
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}

export default Navigation;
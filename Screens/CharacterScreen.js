import React from 'react';
import { View } from 'react-native';
import {
    Card,
    Text,
    List,
    ListItem,
} from 'react-native-elements';

import { Stat, Bar } from '../Components/Stat';
import { HBox, VBox } from '../Components/Box';


export default class CharacterScreen extends React.Component {
    static navigationOptions = {
        title: 'Maddy Tillinghast',
    };

    render() {
        return (
            <HBox>
                <VBox flex={2}>
                    <Card>
                        <Text h4>Maddy Tillinghast</Text>

                        <List>
                            <Bar
                                name="Hit Points"
                                value={9}
                                max={9}
                                color="darkred"
                            />
                            <Bar
                                name="Sanity"
                                value={80}
                                max={97}
                                color="purple"
                            />
                            <Bar
                                name="Luck"
                                value={65}
                                max={99}
                                color="blue"
                            />
                            <Bar
                                name="Magic Points"
                                value={16}
                                max={16}
                                color="green"
                            />

                            <ListItem
                                rightTitle="Occupation"
                                title="Dilettante"
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Age"
                                title="32"
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Sex"
                                title="Female"
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Birthplace"
                                title="Salem, MA"
                                hideChevron
                            />
                            <ListItem
                                rightTitle="Residence"
                                title="Arkham, MA"
                                hideChevron
                            />
                        </List>

                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Characteristics">
                        <Stat
                            name="Strength"
                            value={45}
                        />
                        <Stat
                            name="Constitution"
                            value={40}
                        />
                        <Stat
                            name="Size"
                            value={50}
                        />
                        <Stat
                            name="Dexterity"
                            value={55}
                        />
                        <Stat
                            name="Appearance"
                            value={60}
                        />
                        <Stat
                            name="Education"
                            value={60}
                        />
                        <Stat
                            name="Intelligence"
                            value={70}
                        />
                        <Stat
                            name="Power"
                            value={80}
                        />
                    </Card>
                </VBox>
                <VBox flex={2}>
                    <Card title="Skills">
                        <Stat
                            name="Accounting"
                            value="5"
                            skill
                        />
                        <Stat
                            name="Anthropology"
                            value="1"
                            skill
                        />
                    </Card>
                </VBox>
            </HBox>
        );
    }
}

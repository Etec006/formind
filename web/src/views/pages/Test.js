import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import DemoNavbarDefault from "components/Navbars/DemoNavbarDefault.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

import "../../assets/css/styles-design-system.css";
import api from "services/api";

const alignImg = {
    margin: 'auto',
    width: '45%',
};

class Test extends React.Component {
    constructor(){
        super()
        this.state = {
            test: {
                questions: [
                    {
                        title: '', 
                        text: '', 
                        answers:[
                            {
                                id: '',
                                test: ''
                            }]
                    }
                ]
            },
            currentQuestion: 0,
            answers: [],
            currentAnswer: '',
            currentQuestionIsAnswered: false,
        }
    }

    async componentDidMount() {
        const subjectId = await this.props.match.params.subjectId
        const {data} = await api.get(`test/${subjectId}`, {})

        if(!data){
            api.post('usertest', {
                subject: subjectId
            })
            this.props.history.push(`/principal`);
        }else{
            this.setState({test: data})
        }

    }

    

    render() {

        const handleChangeAnswer = async event => {   
            await this.setState({currentAnswer: event.target.value}) 
        }


        const submitTest = async () => {
            const subjectId = await this.props.match.params.subjectId
            const {data} = await api.post('usertest', {
                subject: subjectId,
                answers: this.state.answers
            })
            this.props.history.push(`/producer/test/result/${data.id}`);
        }

        const onChangeAnswerValue = async event => {
            await this.setState({currentAnswer: event.target.value})
            await this.setState({currentQuestionIsAnswered: true})
        }

        const goToNextQuestion = async () => {
            const answers = this.state.answers
            answers[this.state.currentQuestion] = this.state.currentAnswer
            await this.setState({answers: answers})

            if(this.state.currentQuestion + 1 < this.state.test.questions.length){
                await this.setState({currentAnswer: ''})
                await this.setState({currentQuestion: this.state.currentQuestion + 1})
            }  
        }

        const goToPreviousQuestion = async () => {
            const answers = this.state.answers
            answers[this.state.currentQuestion] = this.state.currentAnswer
            await this.setState({answers: answers})

            if(this.state.currentQuestion > 0){
                await this.setState({currentAnswer: ''})
                await this.setState({currentQuestion: this.state.currentQuestion - 1})
            }
            
        }

        const goToQuestionByIndex = async event => {
            const answers = this.state.answers
            answers[this.state.currentQuestion] = this.state.currentAnswer
            await this.setState({answers: answers})

            const index = event.target.value - 1 
            await this.setState({currentAnswer: ''})
            await this.setState({currentQuestion: index})
        }

        const previosButton = ()=>{
            if(this.state.currentQuestion > 0){
                return <Button
                    className="btn-icon btn-3 mb-lg-3 mt-lg-5 text-left"
                    color="darker"
                    type="button"
                    onClick={goToPreviousQuestion}
                >
                    <span 
                        className="btn-inner--text"
                    >Questão Anterior</span>
                </Button>
            }
        }

        const nextButton = () => {
            if(this.state.currentQuestion + 1 < this.state.test.questions.length){
                return <Button
                    className="btn-icon btn-3 mb-lg-3 mt-lg-5 text-left"
                    color="darker"
                    type="button"
                    onClick={goToNextQuestion}
                >
                    <span 
                        className="btn-inner--text"
                    >Proxima questão</span>
                </Button>
            }else{
                return <Button
                className="btn-icon btn-3 mb-lg-3 mt-lg-5 text-left"
                color="darker"
                type="button"
                onClick={submitTest}
                >
                    <span className="btn-inner--icon mr-1">
                        <i className="ni ni-send" />
                    </span>
                    <span 
                        className="btn-inner--text"
                    >Enviar</span>
                </Button>
            }
        }

        return (
            <>
                <DemoNavbarDefault />
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="none"
                                version="1.1"
                                viewBox="0 0 2560 100"
                                x="0"
                                y="0"
                            >
                                <polygon
                                    className="fill-white"
                                    points="2560 0 2560 100 0 100"
                                />
                            </svg>
                        </div>
                    </section>
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-6 pt-lg-3">
                                    <div className="text-left mt-3">
                                        <h3 class="mb-0 text-darker font-weight-bold">
                                            Questão {this.state.currentQuestion + 1}
                                        </h3>

                                        <div class="mt-3 py-5 border-bottom text-left">
                                            <h6 class="mb-0 text-darker font-wright-400">
                                                <strong class="font-weight-bold mr-lg-1">
                                                    (Enunciado)
                                                </strong>
                                                {this.state.test.questions[this.state.currentQuestion]['text']}
                                            </h6>
                                            <div 
                                                class="text-darker"
                                                /* onChange={onChangeAnswerValue}
                                                value={this.state.currentAnswer} */
                                            >
                                                <br/>
                                                <strong>
                                                    {
                                                    this.state.test.questions[this.state.currentQuestion]['answers'].map( (answer, index) => {
                                                        let checked = this.state.currentAnswer == answer.id || this.state.answers[this.state.currentQuestion] == answer.id;
                                                        if(this.state.answers[this.state.currentQuestion] == answer.id && this.state.currentAnswer != answer.id) this.setState({currentAnswer: this.state.answers[this.state.currentQuestion]})
                                                        return <> 
                                                            <div className="custom-control custom-radio mb-3">
                                                                <input 
                                                                    class="mb-lg-3 custom-control-input custom-radio-button" 
                                                                    type="radio" 
                                                                    id={`radio-${index}`}
                                                                    value={answer.id} 
                                                                    name={`gender`}
                                                                    onChange={handleChangeAnswer}
                                                                    checked={checked}
                                                                /> 
                                                                <label className="custom-control-label" for={`radio-${index}`}> {answer.text} </label>
                                                            </div>
                                                        </>
                                                    })}
                                                </strong>
                                            </div>
                                        </div>

                                        <div class="mt-lg-5 mb-lg-5">
                                            
                                            {previosButton()}
                                                
                                            
                                            {nextButton()}
                                        </div>
                                        <div class="mt-lg-5 mb-lg-5">
                                            <div class="mt-4 py-5 border-top text-left">
                                                <h6 class="mb-0 text-darker font-wright-400">
                                                    <strong class="font-weight-bold mr-lg-1">
                                                        Mapa de Questões
                                                    </strong>
                                                </h6>
                                                <div className="inlineblockdiv">
                                                    <h6 class="mt-lg-2 text-darker font-wright-400">
                                                        {this.state.test.questions.map((question, index) => {
                                                            return (
                                                                <Button
                                                                    className="btn-icon btn-3 mt-lg-1"
                                                                    color="gray"
                                                                    type="button"
                                                                    onClick={goToQuestionByIndex}
                                                                    value={index + 1}
                                                                >
                                                                    {index + 1}
                                                                </Button>
                                                            )
                                                        }) }
                                                        
                                                        
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </section>
                </main>
                <SimpleFooter />
            </>
        );
    }
}

export default Test;
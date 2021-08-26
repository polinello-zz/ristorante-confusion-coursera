import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }
    componentDidMount() {

    }
    renderComments(dish) {
        console.log("render comments", dish)
        if (dish != null)
            return (
                <>
                    <h4>Comments</h4>
                    {dish.comments.map((comment) => {
                        return (<>
                            <p>{comment.comment}</p>
                            <p>{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </>
                        )

                    })}
                </>
            )
        else return <div></div>
    }

    renderDish(dish) {
        if (dish != null)
            return (
                <Card key={dish.id}>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>);
        else
            return (
                <div></div>
            );
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish)}
                    </div>
                </div>
            </div>
        );
    }

}

export default DishDetail;
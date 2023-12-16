import React from "react";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

import { ComponentToPrint } from "./ComponentToPrint";

export class exportPDF extends React.PureComponent {
  render() {
    return (
      <div className="container">
        <div className="mt-5">
          <ReactToPrint content={() => this.componentRef}>
            <div className="row">
              <div className="col-md-6">
                <h4>Preview Of Mark Sheet</h4>
              </div>
              <div className="col-md-6">
                <PrintContextConsumer>
                  {({ handlePrint }) => (
                    <button
                      className="btn btn-outline-success"
                      onClick={handlePrint}
                    >
                      Export Mark Sheet
                    </button>
                  )}
                </PrintContextConsumer>
              </div>
            </div>
          </ReactToPrint>
          <ComponentToPrint ref={(el) => (this.componentRef = el)} />
        </div>

        <a href="/student/marks/view" className="btn btn-outline-dark">
          Back
        </a>
      </div>
    );
  }
}

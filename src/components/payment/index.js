import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  nextStepAction,
  previousStepAction,
} from "../../redux/actions/checkoutActions";
import "./styles.scss";
import { saveOrderAction } from "../../redux/actions/orderActions";

function Payment(props) {
  const { isLoading, err, step, giftsOnCart } = useSelector((state) => ({
    isLoading: state.checkout.isLoading,
    err: state.checkout.err,
    step: state.checkout.step,
    giftsOnCart: state.cart.giftsOnCart,
  }));

  const nameRegex = RegExp(/^[a-zA-Z\u00C0-\u00FF ]+$/);
  const numberRegex = RegExp(/^[0-9]{3}$/);
  const cardRegex = RegExp(
    /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/
  );
  const cpfRegex = RegExp(
    /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
  );
  const visaRegex = RegExp(/^4[0-9]{15}$/);

  const [total, setTotal] = useState(0);

  const calcTotal = () => {
    giftsOnCart.forEach((giftOnCart) => {
      setTotal(giftOnCart.price * giftOnCart.count);
    });
  };

  React.useEffect(() => {
    calcTotal();
  }, [giftsOnCart]);

  const formik = useFormik({
    initialValues: {
      id_type: "",
      id_number: "",
      card_number: "",
      card_name: "",
      expiration_month: "",
      expiration_year: "",
      card_code: "",
      number_of_installments: "",
    },
    validationSchema: Yup.object().shape({
      id_type: Yup.string()
        .required("Obrigatório.")
        .oneOf(["CPF", "TAX NUMBER"]),
      id_number: Yup.string()
        .required("Obrigatório.")
        .matches(cpfRegex, "CPF Inválido."),
      card_number: Yup.string()
        .required("Obrigatório.")
        .matches(cardRegex, "Cartão de crédito Inválido."),
      card_name: Yup.string()
        .required("Obrigatório.")
        .matches(nameRegex, "Números não são permitidos."),
      expiration_month: Yup.string().required("Obrigatório."),
      expiration_year: Yup.string().required("Obrigatório."),
      card_code: Yup.string()
        .required("Obrigatório.")
        .matches(numberRegex, "Insira todos os dígitos de segurança."),
      number_of_installments: Yup.string().required("Obrigatório."),
    }),
    onSubmit: async (values) => {
      //alert(JSON.stringify(values, null, 2));
      dispatch(saveOrderAction(values, true));
      dispatch(nextStepAction(step));
      history.push("3");
    },
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const goBack = () => {
    dispatch(previousStepAction(step));
    history.goBack();
  };

  const proceed = () => {
    try {
      formik.handleSubmit();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="payment-main-container">
      <div>
        <h2>Escolha sua forma de pagamento</h2>
      </div>
      <form className="payment-contents" onSubmit={formik.handleSubmit}>
        <div className="payment-content-block">
          <label>Documentação de Identificação</label>
          <select
            name="id_type"
            value={formik.values.id_type}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled hidden>
              SELECIONE
            </option>
            <option>CPF</option>
            <option>TAX NUMBER</option>
          </select>
          {formik.touched.id_type && formik.errors.id_type ? (
            <div className="content-validation">{formik.errors.id_type}</div>
          ) : null}
        </div>
        <div className="payment-content-block">
          <label>Número do Documento</label>
          <input
            type="text"
            name="id_number"
            value={formik.values.id_number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.id_number && formik.errors.id_number ? (
            <div className="content-validation">{formik.errors.id_number}</div>
          ) : null}
        </div>
        <div className="payment-content-block">
          <label>Número do Cartão</label>
          <input
            type="text"
            name="card_number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.card_number && formik.errors.card_number ? (
            <div className="content-validation">
              {formik.errors.card_number}
            </div>
          ) : null}
        </div>
        <div className="payment-content-block">
          <label>Nome no Cartão</label>
          <input
            type="email"
            name="card_name"
            value={formik.values.card_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.card_name && formik.errors.card_name ? (
            <div className="content-validation">{formik.errors.card_name}</div>
          ) : null}
        </div>
        <div className="payment-content-block">
          <span>Validade</span>
          <div className="card-expiration-container">
            {/* <label>Mês</label> */}
            <select
              name="expiration_month"
              value={formik.values.expiration_month}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled hidden></option>
              <option>01</option>
              <option>02</option>
            </select>
            {formik.touched.expiration_month &&
            formik.errors.expiration_month ? (
              <div className="content-validation-expiration-month">
                {formik.errors.expiration_month}
              </div>
            ) : null}
            {/* <label>Ano</label> */}
            <select
              name="expiration_year"
              value={formik.values.expiration_year}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" selected disabled hidden></option>
              <option>2022</option>
              <option>2023</option>
            </select>
            {formik.touched.expiration_year && formik.errors.expiration_year ? (
              <div className="content-validation-expiration-year">
                {formik.errors.expiration_year}
              </div>
            ) : null}
          </div>
        </div>
        <div className="payment-content-block">
          <label>Código de Segurança</label>
          <input
            type="text"
            name="card_code"
            value={formik.values.card_code}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.card_code && formik.errors.card_code ? (
            <div className="content-validation">{formik.errors.card_code}</div>
          ) : null}
        </div>
        <div className="payment-content-block">
          <label>Número de Parcelas</label>
          <select
            name="number_of_installments"
            value={formik.values.number_of_installments}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="" selected disabled hidden></option>
            <option>{`1x de R$ ${parseFloat(total)
              .toFixed(2)
              .split(".")
              .join(",")}`}</option>
            <option>{`2x de R$ ${parseFloat(total / 2)
              .toFixed(2)
              .split(".")
              .join(",")}`}</option>
            <option>{`3x de R$ ${parseFloat(total / 3)
              .toFixed(2)
              .split(".")
              .join(",")}`}</option>
          </select>
          {formik.touched.number_of_installments &&
          formik.errors.number_of_installments ? (
            <div className="content-validation">
              {formik.errors.number_of_installments}
            </div>
          ) : null}
        </div>
        {/* <div>
          <button type="submit">Submit</button>
        </div> */}
      </form>
      <div className="payment-buttons">
        <button onClick={goBack}>Retornar à informações</button>
        <button onClick={proceed}>Prosseguir</button>
      </div>
    </div>
  );
}

export default Payment;

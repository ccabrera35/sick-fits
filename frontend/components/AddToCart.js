import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY, useUser } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const user = useUser();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const onClick = () => {
    if (!user) {
      window.location.href = '/signin';
    } else {
      addToCart();
    }
  };

  return (
    <button disabled={loading} type="button" onClick={onClick}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}

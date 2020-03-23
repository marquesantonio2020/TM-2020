using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Paddle : MonoBehaviour
{
    public float speed;
    public Rigidbody2D rb;

    private Vector3 startPosition;

    private float movement;
    // Start is called before the first frame update
    void Start()
    {
        startPosition = transform.position; //store first position of paddle(Position displayed at the beggining of the game).   
    }

    // Update is called once per frame
    void Update()
    {
        //Access this vertical input in Edit > Projetct Settings > Input > Axes > Vertical

        movement = Input.GetAxisRaw("Vertical"); //Default by unity are the keys W and S along with other properties.Returnsthe value of the virtual axis in the range of -1..1
        rb.velocity = new Vector2(rb.velocity.x, movement * speed); //Set velocity of paddle. Since paddle doesn´t move horizontaly velocity of x is 0;
    }

    public void Reset()
    {
        rb.velocity = Vector2.zero; //Reset Velocity
        transform.position = startPosition; // Reset position to the initial one
    }
}

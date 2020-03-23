using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Loss : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("ballTag"))//When colides with a gameObject with tag "ballTag"
        {
            GameObject.Find("ball").GetComponent<Ball>().Reset();//Resets ball position
            GameObject.Find("gameManagerObj").GetComponent<Manager>().Reset(); //Resets Count
            GameObject.Find("Player1").GetComponent<Paddle>().Reset(); //Resets paddle position
        }
    }
}

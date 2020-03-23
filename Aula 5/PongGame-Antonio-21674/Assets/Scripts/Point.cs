using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Point : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.gameObject.CompareTag("ballTag")) //When wall collides with gameObject with a tag "ballTag"
        {
            GameObject.Find("gameManagerObj").GetComponent<Manager>().Player1Scored();//Call function to increment score in manager class
        }     
    }
}

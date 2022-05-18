from django.shortcuts import render
import os
import openai
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from gettingstarted.settings import OPENAI_API_KEY

@csrf_exempt
def index(request):

    openai.api_key = OPENAI_API_KEY

    context = {"api_key" : openai.api_key

    }

    return render(request,'index.html', context)


@csrf_exempt 
def getResponse(request):

    request_dic = dict(request.POST)

    openai.api_key = OPENAI_API_KEY
    
    response = openai.Completion.create(
    engine=request_dic['engine'][0],
    prompt= request_dic['prompt'][0],
    temperature= float(request_dic['temperature'][0]),
    max_tokens=int(request_dic['max_tokens'][0]),
    top_p=float(request_dic['top_p'][0]),
    frequency_penalty=float(request_dic['frequency_penalty'][0]),
    presence_penalty=float(request_dic['presence_penalty'][0])
    )

    context = {
        "response": response,
    }
    return JsonResponse(context)